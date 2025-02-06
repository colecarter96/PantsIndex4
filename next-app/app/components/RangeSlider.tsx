// 'use client';

// import React from 'react';
// import { Range } from 'react-range';

// interface RangeSliderProps {
//   min: number;
//   max: number;
//   step: number;
//   values: number[]; // Update this to number[] instead of [number, number]
//   onChange: (values: number[]) => void; // Update this to number[] instead of [number, number]
// }

// const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, step, values, onChange }) => {
//   return (
//     <div className="flex flex-col items-center">
//       <Range
//         values={values}
//         step={step}
//         min={min}
//         max={max}
//         onChange={onChange}
//         renderTrack={({ props, children }) => {
//             const { key, ...trackProps } = props as { key?: any; style?: React.CSSProperties }; // Assert style exists
//             return (
//             <div
//                 {...trackProps}
//                 key={key}
//                 className="h-1 w-full bg-gray-300 rounded-full"
//                 style={{
//                 ...(trackProps.style || {}), // Safely spread existing styles if present
//                 height: '4px',
//                 background: `linear-gradient(to right, #424242 ${((values[0] - min) / (max - min)) * 100}%, #424242 ${((values[1] - min) / (max - min)) * 100}%)`,
//                 }}
//             >
//                 {children}
//             </div>
//             );
//         }}
//         renderThumb={({ props }) => {
//             const { key, ...thumbProps } = props as { key?: any; style?: React.CSSProperties }; // Assert style exists
//             return (
//             <div
//                 {...thumbProps}
//                 key={key}
//                 className="w-3 h-5 bg-slate-950 rounded-md shadow-md cursor-pointer"
//             />
//             );
//         }}
//         />

//       <div className="flex justify-between w-full text-sm mt-2">
//         <span>{values[0]}</span>
//         <span>{values[1]}</span>
//       </div>
//     </div>
//   );
// };

// export default RangeSlider;
'use client';

import React from 'react';
import { Range } from 'react-range';

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  values: number[]; // Update this to number[] instead of [number, number]
  onChange: (values: number[]) => void; // Update this to number[] instead of [number, number]
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, step, values, onChange }) => {
  return (
    <div className="flex flex-col items-center">
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={onChange}
        renderTrack={({ props, children }) => {
            const { key, ...trackProps } = props as { key?: any; style?: React.CSSProperties }; // Assert style exists
            const leftPercent = ((values[0] - min) / (max - min)) * 100;
            const rightPercent = ((values[1] - min) / (max - min)) * 100;
            return (
            <div
                {...trackProps}
                key={key}
                className="h-1 w-full bg-gray-300 rounded-full"
                style={{
                ...(trackProps.style || {}), // Safely spread existing styles if present
                height: '4px',
                background: `linear-gradient(to right, #d1d5db ${leftPercent}%, #424242 ${leftPercent}% ${rightPercent}%, #d1d5db ${rightPercent}%)`,
                }}
            >
                {children}
            </div>
            );
        }}
        renderThumb={({ props }) => {
            const { key, ...thumbProps } = props as { key?: any; style?: React.CSSProperties }; // Assert style exists
            return (
            <div
                {...thumbProps}
                key={key}
                className="w-4 h-7 lg:w-2 lg:h-5 bg-slate-950 rounded-md shadow-md cursor-pointer"
                // w-2 h-5
            />
            );
        }}
        />

      <div className="flex justify-between w-full text-sm mt-2">
        <span>{values[0]}</span>
        <span>{values[1]}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
