import React from 'react'
import * as Select from '@radix-ui/react-select';
const SelectField = () => {
  return (
    <Select.Root defaultValue="apple">
      <Select.Trigger />
      <Select.Content position="popper">
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="orange">Orange</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}

export default SelectField


//  <Select.Root>
//     <Select.Trigger>
//       <Select.Value />
//       <Select.Icon />
//     </Select.Trigger>

//     <Select.Portal>
//       <Select.Content>
//         <Select.ScrollUpButton />
//         <Select.Viewport>
//           <Select.Item>
//             <Select.ItemText />
//             <Select.ItemIndicator />
//           </Select.Item>

//           <Select.Group>
//             <Select.Label />
//             <Select.Item>
//               <Select.ItemText />
//               <Select.ItemIndicator />
//             </Select.Item>
//           </Select.Group>

//           <Select.Separator />
//         </Select.Viewport>
//         <Select.ScrollDownButton />
//         <Select.Arrow />
//       </Select.Content>
//     </Select.Portal>
//   </Select.Root>