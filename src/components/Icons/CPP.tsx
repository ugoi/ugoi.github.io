import * as React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const CPP: React.FC<SvgIconProps> = ({ ...props }) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        clipRule="evenodd"
        viewBox="0 0 48 48"
      >
        <path
          fill="#00549d"
          fillRule="evenodd"
          d="M22.903 3.286a2.247 2.247 0 012.193 0l16.807 9.434A2.12 2.12 0 0143 14.566v18.867c0 .762-.418 1.466-1.097 1.847l-16.807 9.434a2.247 2.247 0 01-2.193 0L6.096 35.28A2.122 2.122 0 015 33.434V14.567c0-.762.418-1.466 1.097-1.847l16.806-9.434z"
        ></path>
        <path
          fill="#0086d4"
          fillRule="evenodd"
          d="M5.304 34.404C5.038 34.048 5 33.71 5 33.255V14.496c0-.758.417-1.458 1.094-1.836l16.748-9.38c.677-.379 1.594-.371 2.271.008 3.343 1.872 13.371 7.459 16.714 9.331.27.152.476.335.66.576L5.304 34.404z"
        ></path>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M24 10c7.727 0 14 6.273 14 14s-6.273 14-14 14-14-6.273-14-14 6.273-14 14-14zm0 7c3.863 0 7 3.136 7 7 0 3.863-3.137 7-7 7s-7-3.137-7-7c0-3.864 3.136-7 7-7z"
        ></path>
        <path
          fill="#0075c0"
          fillRule="evenodd"
          d="M42.485 13.205c.516.483.506 1.211.506 1.784 0 3.795-.032 14.589.009 18.384.004.396-.127.813-.323 1.127L23.593 24l18.892-10.795z"
        ></path>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M31 21h2v6h-2zm7 0h2v6h-2z"
        ></path>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M29 23h6v2h-6zm7 0h6v2h-6z"
        ></path>
      </svg>
    </SvgIcon>
  );
};

export default CPP;
