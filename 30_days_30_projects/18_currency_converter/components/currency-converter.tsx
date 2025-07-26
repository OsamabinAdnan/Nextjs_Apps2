'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { ClipLoader } from 'react-spinners';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { motion } from 'framer-motion'



// Define exchange rates type
type ExchangeRates = {
    [key:string]:number;
}

type Currency = "USD" | "EUR" | "GBP" | "JPY" | "AUD" | "CAD" | "PKR" | "AED" | "SAR";


export default function CurrencyConverter() {
    // State to manage the amount input by the user
    const [amount, setAmount] = useState<number | null>(null);
    // State to manage the source currency selected by the user
    const [sourceCurrency, setSourceCurrency] = useState<Currency>("USD");
    // State to manage the target currency selected by the user
    const [targetCurrency, setTargetCurrency] = useState<Currency>("PKR");
    // State to manage the fetched exchange rates
    const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({})
    // State to manage the converted amount
    const [convertedAmount, setConvertedAmount] = useState<string>("0.00");
    // State to manage the loading state during data fetch
    const [loading, setLoading] = useState<boolean>(false);
    // State to manage any error messages
    const [error, setError] = useState<string | null>(null);

    // Function to reset the form to its initial state
    const resetForm = () => {
        setAmount(null);
        setSourceCurrency("USD");
        setTargetCurrency("PKR");
        setConvertedAmount("0.00");
    }

    // useEffect to fetch exchange rates when the component mounts
    useEffect(() => {
        const fetchExchangeRates = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch ('https://api.exchangerate-api.com/v4/latest/USD') // Fetching exchange rates from the API
                const data = await response.json();  // Parsing the response data
                setExchangeRates(data.rates); // Setting the fetched rates to state
                

            } catch (error){
                setError("Failed to fetch exchange rates. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchExchangeRates();
    }, []); // Fetch exchange rates on component mount

    // Function to handle changes in the amount input field
    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value
        if (value && parseFloat(value) < 0) return // Prevent negative amounts
        setAmount(value ? parseFloat(value) : null); // Update amount state, or set to null if input is empty
    }

    // Function to handle changes in the source currency select field
    const handleSourceCurrencyChange = (value: Currency): void => {
        setSourceCurrency(value);
    }

    // Function to handle changes in the target currency select field
    const handleTargetCurrencyChange = (value: Currency): void => {
        setTargetCurrency(value);
    };

    // Function to calculate the converted amount
    const calculateConvertedAmount = (): void => {
        if (sourceCurrency && targetCurrency && amount !== null && exchangeRates){
            
            const rate = sourceCurrency === "USD" ? exchangeRates[targetCurrency] : exchangeRates[targetCurrency] / exchangeRates[sourceCurrency]; // Calculate the exchange rate based on source and target currencies

            const result = amount * rate; // Calculating the converted amount

            setConvertedAmount(result.toFixed(2)); // Set the converted amount with two decimal places
        }
    }
    // JSX return statement rendering the Currency Converter UI
    return (
        <>
            <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 border-t-violet-500'>
                <motion.div
                initial={{ opacity: 0, y: 50 , scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                >
                    <Card className='w-full max-w-md p-6 shadow-lg space-y-4 bg-white/50 backdrop-blur-sm border border-gray-200'>
                        <CardHeader className='text-center'>
                            <CardTitle className='text-2xl fon-bold'>
                                Currency Converter
                            </CardTitle>
                            <CardDescription>
                                Convert between different currencies using real-time exchange rates.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className='flex justify-center'>
                                    <ClipLoader className='w-6 h-6 text-blue-500'/>
                                </div>
                            ):(error ? (
                                <div className='text-red-500 text-center'>
                                    {error}
                                </div>
                            ):(
                                <div className='grid gap-4'>
                                    {/* Amount input and source currency selection */}
                                    <div className='grid grid-cols-[1fr-auto] items-center gap-2'>
                                        <Label htmlFor='from'>From</Label>
                                        <div className='grid grid-cols-[1fr-auto] items-center gap-2'>
                                            <Input
                                                type='number'
                                                placeholder='Amount'
                                                value={amount || ""}
                                                onChange={handleAmountChange}
                                                className='w-full'
                                                id='from'
                                            />
                                            <Select
                                                value={sourceCurrency}
                                                onValueChange={handleSourceCurrencyChange}
                                            >
                                                <SelectTrigger className='w-24'>
                                                    <SelectValue placeholder="USD"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value='USD'>USD</SelectItem>
                                                        <SelectItem value="EUR">EUR</SelectItem>
                                                        <SelectItem value="GBP">GBP</SelectItem>
                                                        <SelectItem value="JPY">JPY</SelectItem>
                                                        <SelectItem value="AUD">AUD</SelectItem>
                                                        <SelectItem value="CAD">CAD</SelectItem>
                                                        <SelectItem value="PKR">PKR</SelectItem>
                                                        <SelectItem value="AED">AED</SelectItem>
                                                        <SelectItem value="SAR">SAR</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    {/* Converted amount display and target currency selection */}
                                    <div className='grid grid-cols-[1fr-auto] items-center gap-2'>
                                        <Label htmlFor='to'>To</Label>
                                        <div className='grid grid-cols-[1fr-auto] items-center gap-2'>
                                            <div className='text-2xl font-bold'>{convertedAmount}</div>
                                            <Select
                                                value={targetCurrency}
                                                onValueChange={handleTargetCurrencyChange}
                                            >
                                                <SelectTrigger className='w-24'>
                                                    <SelectValue placeholder="PKR"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="USD">USD</SelectItem>
                                                        <SelectItem value="EUR">EUR</SelectItem>
                                                        <SelectItem value="GBP">GBP</SelectItem>
                                                        <SelectItem value="JPY">JPY</SelectItem>
                                                        <SelectItem value="AUD">AUD</SelectItem>
                                                        <SelectItem value="CAD">CAD</SelectItem>
                                                        <SelectItem value="PKR">PKR</SelectItem>
                                                        <SelectItem value="AED">AED</SelectItem>
                                                        <SelectItem value="SAR">SAR</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className='flex flex-col gap-2'>
                            {/* Convert button */}
                            <Button
                                type="button"
                                className="w-full"
                                onClick={calculateConvertedAmount}
                            >
                                Convert
                            </Button>
                             <Button
                                variant="outline"
                                className="w-full border-gray-300 hover:bg-gray-100"
                                onClick={resetForm}
                            >
                                Reset
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </>
    )
}
