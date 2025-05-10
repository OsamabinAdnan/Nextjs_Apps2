'use client' // Indicates that this is a client-side component in Next.js

// Import necessary dependencies and UI components
import React, { ChangeEvent, useState } from 'react' // React core and hooks
import { unitTypes } from './units' // Import unit categories from a local module
import { conversionRates } from './units' // Import unit conversion rates from the same module
import { Label } from './ui/label' // UI label component
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select' // Custom select dropdown components
import { Input } from './ui/input' // Input field component
import { Button } from './ui/button' // Button component
import toast, { Toaster } from 'react-hot-toast' // Toast notifications
import ThemeToggle from './ThemeToggle'

// Main component definition
export default function UnitConverter() {
    // Define state variables to hold input value, selected units, and converted result
    const [inputValue, setInputValue] = useState<number | null>(null);
    const [inputUnit, setInputUnit] = useState<string | null>(null);
    const [outputUnit, setOutputUnit] = useState<string | null>(null);
    const [convertedValue, setConvertedValue] = useState<number | null>(null);

    // Handle changes in numeric input
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(parseFloat(e.target.value)) // Convert input string to number
    }

    // Handle change in selected input unit
    const handleInputUnitChange = (value: string) => {
        setInputUnit(value) // Set input unit from select
    }

    // Handle change in selected output unit
    const handleOutputUnitChange = (value: string): void => {
        setOutputUnit(value) // Set output unit from select
    };

    // Convert input value to output unit based on selected units and category
    const convertValue = (): void => {
        if (inputValue !== null && inputUnit && outputUnit) { // Ensure all inputs are present
            let unitCategory: string | null = null;

            // Determine which category both units belong to
            for (const category in unitTypes) {
                if (
                    unitTypes[category].includes(inputUnit) &&
                    unitTypes[category].includes(outputUnit)
                ) {
                    unitCategory = category;
                    break; // Stop once the category is found
                }
            }

            // If both units are from the same category, perform conversion
            if (unitCategory) {
                const baseValue = inputValue * conversionRates[unitCategory][inputUnit]; // Convert to base unit
                const result = baseValue / conversionRates[unitCategory][outputUnit]; // Convert to target unit
                setConvertedValue(result); // Update the result state
                toast.success('Conversion successful!', { // Show success toast
                    duration: 3000,
                    position: 'top-center'
                });
            } else {
                // Units are incompatible; show error
                setConvertedValue(null);
                toast.error('Incompatible units types selected', {
                    duration: 3000,
                    position: 'top-center'
                });
            }
        } else {
            // Missing required fields; show error
            setConvertedValue(null);
            toast.error('Please fill all the fields', {
                duration: 3000,
                position: 'top-center'
            });
        }
    };

    // JSX to render the component
    return (
        <>
            <Toaster /> {/* Renders toast notifications */}
            <div className='flex flex-col items-center justify-center min-h-screen p-4 '>
                <div className=''>
                    <ThemeToggle/>
                </div>
                {/* Card container */}
                <div className='w-full max-w-md p-4 md:p-6 lg:p-8 bg-card rounded-lg shadow-2xl border border-border transition-all'>
                    {/* Header */}
                    <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center mb-2'>Unit Converter</h1>
                    <p className='text-sm md:text-base lg:text-lg text-center font-normal text-muted-foreground mb-6'>Convert values between different units</p>
                    
                    {/* Form section */}
                    <div className='flex flex-col gap-6'>
                        {/* Grid for unit selection */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {/* Input unit selector */}
                            <div className='space-y-2'>
                                <Label htmlFor='input-unit' className='text-sm font-medium'>From</Label>
                                <Select onValueChange={handleInputUnitChange}>
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder='Select unit'/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* Render unit categories and options */}
                                        {Object.entries(unitTypes).map(([category, units]) => (
                                            <SelectGroup key={category}>
                                                <SelectLabel className='font-semibold'>
                                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                                </SelectLabel>
                                                {units.map((unit) => (
                                                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Output unit selector */}
                            <div className='space-y-2'>
                                <Label htmlFor='output-unit' className='text-sm font-medium'>To</Label>
                                <Select onValueChange={handleOutputUnitChange}>
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder='Select unit'/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* Render unit categories and options */}
                                        {Object.entries(unitTypes).map(([category, units]) => (
                                            <SelectGroup key={category}>
                                                <SelectLabel className='font-semibold'>
                                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                                </SelectLabel>
                                                {units.map((unit) => (
                                                    <SelectItem key={unit} value={unit}>
                                                        {unit}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Input value field */}
                        <div className='space-y-2'>
                            <Label htmlFor='input-value' className='text-sm font-medium'>Value</Label>
                            <Input
                                id='input-value'
                                type='number'
                                placeholder='Enter value'
                                onChange={handleInputChange}
                                className='w-full'
                            />
                        </div>

                        {/* Convert button */}
                        <Button 
                            type='button' 
                            onClick={convertValue}
                            className="w-full py-2 transition-colors">
                            Convert
                        </Button>

                        {/* Display converted result */}
                        <div className="mt-4 text-center p-4 bg-muted rounded-lg">
                            <div className='text-2xl md:text-3xl lg:text-4xl font-bold text-primary'>
                                {convertedValue !== null ? convertedValue.toFixed(2) : '0'} {/* Show result or 0 */}
                            </div>
                            <div className='text-sm md:text-base text-muted-foreground mt-1'>
                                {outputUnit ? outputUnit : 'Unit'} {/* Show unit label or default */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
