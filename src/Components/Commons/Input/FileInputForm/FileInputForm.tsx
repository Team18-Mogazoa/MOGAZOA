import classNames from 'classnames';
import React, { forwardRef, useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import InputContainer from '@/Components/Commons/Input/InputContainer';
import { ReactComponent as ImageIconSvg } from '@/public/Icons/img-icon.svg';

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  className?: string;
  label?: string;
  errorMessage?: string | undefined | null;
  register?: UseFormRegisterReturn;
  backgroundImageUrl?: string;
}

const FileInputForm = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFormProps>(
  (
    {
      className = '',
      label = '',
      errorMessage = '',
      required = false,
      backgroundImageUrl = '',
      register,
      ...rest
    }: InputFormProps,
    ref
  ) => {
    const [backgroundImage, setBackgroundImage] = useState<string | null>(backgroundImageUrl || null);
    const [inputId, setInputId] = useState<string | null>(null);

    useEffect(() => {
      setInputId(label || `file-input-${Math.random().toString(36).substr(2, 9)}`);
    }, [label]);

    const { onChange: registerOnChange, ...restProps } = rest;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (registerOnChange) {
        registerOnChange(event);
      }
      const file = event.target.files?.[0];
      if (file) {
        const fileURL = URL.createObjectURL(file);
        setBackgroundImage(fileURL);
      }
    };

    useEffect(
      () => () => {
        if (backgroundImage) {
          URL.revokeObjectURL(backgroundImage);
        }
      },
      [backgroundImage]
    );

    const inputFieldContainerClasses = classNames(
      'absolute inset-0 rounded-lg overflow-hidden h-full w-full',
      errorMessage && 'border-red',
      className
    );

    return (
      <InputContainer className={className} label={label} required={required} errorMessage={errorMessage}>
        {inputId && (
          <label
            htmlFor={inputId}
            className="relative cursor-pointer rounded-lg border border-black4 bg-black3 aspect-video hover:border-blue w-full h-full"
          >
            <div
              className={inputFieldContainerClasses}
              style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1,
              }}
            />
            <div className="flex flex-col items-center gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ImageIconSvg className="w-8 h-8" />
            </div>
            <input
              className="hidden"
              id={inputId}
              type="file"
              accept="image/*"
              ref={ref as React.Ref<HTMLInputElement>}
              onChange={handleFileChange}
              {...restProps}
            />
          </label>
        )}
      </InputContainer>
    );
  }
);

export default FileInputForm;