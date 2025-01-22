import React, { useState } from 'react'
import Select from 'react-select'
import { default as ReactSelect, components } from "react-select";
let singleSelectOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
];
let multiSelectOptions = [
  { value: 'optionA', label: 'Option A' },
  { value: 'optionB', label: 'Option B' },
  { value: 'optionC', label: 'Option C' },
  { value: 'optionD', label: 'Option D' },
];


const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};


const TableOne = () => {
  
  const [rows , setRows] = useState([]);
  const [newMultiSelectOption, setNewMultiSelectOption] = useState("");

  const handleAddRow=()=>{
    setRows([...rows,{singleSelect : "", multiSelect : []}])
  }

  const handleSelectSingleChange=(index,selectedValue)=>{
    console.log(selectedValue.value)
    const updatedRows = [...rows]
    updatedRows[index].singleSelect =selectedValue? selectedValue.value : '';
    setRows(updatedRows)
 }

 const handleMultipleSelectChange=(index,selectedOption)=>{
  const updatedRows = [...rows]
  updatedRows[index].multiSelect = selectedOption ? selectedOption.value : '';
  setRows(updatedRows)
 }

 const handleAddnewOption=()=>{
  // console.log(newMultiSelectOption)
  // console.log(multiSelectOptions)

  if (newMultiSelectOption && !multiSelectOptions.some(option => option.value.toLowerCase() === newMultiSelectOption.toLowerCase())){
    multiSelectOptions = [...multiSelectOptions,{value : newMultiSelectOption, label : newMultiSelectOption}]
    console.log(multiSelectOptions)
    setNewMultiSelectOption("")
  }else{
    alert("Please enter a valid or unique input")
  }
 }

  return (
         <div className='h-screen-a p-8 bg-gray-50'>
          <div className='text-center mb-5'>
          <span className='text-5xl  p-2 rounded-md hover:text-white hover:bg-gray-500'>Table wireframe</span>
          </div>
          <div className="overflow-x-auto">
          <table className='min-w-full table-auto border-collapse border-2 border-gray-300'>
            <thead className='border-2 p-2'>
              <tr className='bg-gray-100'>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Label-1-for single select</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Label-2-for multiple select</th>
              </tr>
            </thead>
            <tbody className='m-10 border-2 border-gray-950'>
             {rows.map((row,index)=>{
              const selectedOptions = rows.filter((r,idx)=> idx !==index)
              .map((r)=>r.singleSelect)
              .filter((option)=> option !=="");


              const availableSelectedOption = singleSelectOptions.filter((option)=> !selectedOptions.includes(option.value))
   
             return (
                <tr key={index}  className="border-t">
                 
                <div>
                <td  className="px-6 py-4 w-1/2">
                   <Select  
                   placeholder="select options"
                   options={availableSelectedOption}
                   value={availableSelectedOption.find(option => option.value === row.singleSelect)}
                   onChange={(selectedOption)=>handleSelectSingleChange(index,selectedOption)}
                   className="w-full relative  shadow-lg"
                   />
                 </td>
                </div>
                 
            
                <td className="px-6 py-4 w-1/2">
                  <div className="flex flex-col items-start">
                  <Select
                   isMulti={true}
                   placeholder="select mulitiple options"
                   value={row.multiSelect}
                   options={multiSelectOptions}
                   onChange={(selectedOption)=>handleMultipleSelectChange(index,selectedOption)}
                   className="w-full shadow-lg"
                   components={{
                    Option
                  }}
                   />
                    <div className="flex justify-between mt-4 w-full">
                    <input type="text" 
                    placeholder='add new option' 
                    value={newMultiSelectOption}
                    onChange={(newMultiSelectVal)=>setNewMultiSelectOption(newMultiSelectVal.target.value)}
                    className="border-2 w-72 p-2 rounded-md shadow-lg"
                    />
                    <button onClick={handleAddnewOption}
                   className="bg-black text-white p-2 px-4 rounded-md cursor-pointer shadow-lg"
                    >+Add</button>
                   </div>
                  </div>
                 </td>
             
                </tr>
              )
             })}
            </tbody>
          </table>

          </div>
          <div className='flex justify-end'>
          <button
          className="mt-6 shadow-lg bg-black text-white px-6 py-2 rounded-md cursor-pointer hover:bg-slate-900 hover:font-bold"
          onClick={handleAddRow}>Add new Row</button>
          </div>
         
         </div> 
  )

}
export default TableOne
