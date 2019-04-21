import React from 'react';
import { Button } from 'react-bootstrap';
import './LoaderButton.css';

export default ({
  isLoading,
  text,
  loading,
  loadingText,
  className = '',
  disabled = false,
  ...props
}) => (
  <Button
    className={`LoaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <i className="fal fa-sync spinning" />}
    {!isLoading ? text : loadingText}
  </Button>
);
