'use client'

import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { format } from 'date-fns';
import { Button } from './ui/button';
import { FilePenIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { DialogFooter, DialogHeader } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';

// Define the Expense type
type Expense = {
    id: number;
    name: string;
    amount: number;
    date: Date;
}

// Initial expenses to populate the tracker
const initialExpenses:Expense [] = [
    {
        id: 1,
        name: "Groceries",
        amount: 250,
        date: new Date("2024-05-15"),
    },
    {
        id: 2,
        name: "Rent",
        amount: 250,
        date: new Date("2024-06-01"),
    },
    {
        id: 3,
        name: "Utilities",
        amount: 250,
        date: new Date("2024-06-05"),
    },
    {
        id: 4,
        name: "Dining Out",
        amount: 250,
        date: new Date("2024-06-10"),
    },
]

export default function ExpenseTracker() {

    // State to manage the list of expenses
    const [expenses, setExpenses] = useState<Expense[]>([])

    // State to manage the visibility of the modal
    const [showModal, setShowModal] =useState<boolean>(false)

    // State to track if an expense is being edited
    const [isEditing, setIsEditing] = useState<boolean>(false)

    // State to track the current expense being edited
    const [currentExpenseId, setCurrentExpenseId] = useState<number | null>(null)

    // State to manage the new expense input form
    const [newExpense, setNewExpense] = useState<{
        name: string;
        amount: string;
        date: Date;
    }> ({
        name: "",
        amount: "",
        date: new Date(),
    })


    // useEffect to load expenses from local storage or set initial expenses
    useEffect(() => {
        const storedExpenses = localStorage.getItem("expenses");
        if (storedExpenses){
            setExpenses(
                JSON.parse(storedExpenses).map((expenses:Expense) => ({
                    ...expenses,
                    date: new Date(expenses.date) // Ensure date is a Date object
                }))
            )
        } else {
            setExpenses(initialExpenses);
        }
    }, []);

    // useEffect to store expenses in local storage whenever they change
    useEffect(() => {
        if (expenses.length > 0) {
            localStorage.setItem("expenses", JSON.stringify(expenses));
        }
    }, [expenses]);

    // Function to handle adding a new expense
    const handleAddExpense = ():void => {
        setExpenses([
            ...expenses,
            {
                id: expenses.length + 1,
                name: newExpense.name,
                amount: parseFloat(newExpense.amount),
                date: new Date(newExpense.date),
            },
        ]);
        resetForm(); // Reset the input form
        setShowModal(false); // Close the modal
    };

    // Function to handle editing an existing expense
    const handleEditExpense = (id:number):void => {
        const expenseToEdit = expenses.find((expense) => expense.id === id);
        if (expenseToEdit) {
            setNewExpense({
                name: expenseToEdit.name,
                amount: expenseToEdit.amount.toString(),
                date: expenseToEdit.date,
            });
            setCurrentExpenseId(id);
            setIsEditing(true);
            setShowModal(true);
        }
    };

    // Function to handle saving the edited expense
    const handleSaveEditExpense = (): void => {
        setExpenses(
            expenses.map((expense) => 
                expense.id === currentExpenseId ? 
                {
                    ...expense, ...newExpense, amount:parseFloat(newExpense.amount)
                } : expense
            )
        );
        resetForm(); // Reset the input form
        setShowModal(false); // Close the modal
    };

    // Function to reset the input form
    const resetForm = (): void => {
        setNewExpense({
        name: "",
        amount: "",
        date: new Date(),
        });
        setIsEditing(false);
        setCurrentExpenseId(null);
    };

    // Function to handle deleting an expense
    const handleDeleteExpense = (id: number): void => {
        setExpenses(expenses.filter((expense) => expense.id !== id));
    };

    // Calculate the total expenses
    const totalExpenses = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

     // Function to handle input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = e.target;
        setNewExpense((prevExpense) => ({
        ...prevExpense,
        [id]:
            id === "amount"
            ? parseFloat(value)
            : id === "date"
            ? new Date(value)
            : value,
        }));
    };

    // JSX return statement rendering the Expense Tracker UI
  return (
    <>
        <div className='flex flex-col h-screen relative z-10'>
            <span className='bg-gradient-to-bl from-[#9980b5] to-[#bbbbf4] absolute top-0 left-0 w-full h-full z-[-10]'/>
            {/* Header section */}
            <header className='bg-primary text-primary-foreground py-4 px-6 shadow'>
                <div className='flex md:flex-row flex-col md:justify-between justify-center items-center'>
                    <h1 className='md:text-3xl text-2xl font-bold text-center'>Expense Tracker</h1>
                    <div className='md:text-3xl text-2xl font-bold text-center'>
                        Total: ${totalExpenses.toFixed(2)}
                    </div>
                </div>
            </header>

            {/* Main section */}
            <main className='flex-1 overflow-y-auto p-6'>
                <ul className='space-y-4'>
                    {expenses.map((expense) => (
                        <li 
                            key={expense.id}
                            className='flex justify-between items-center bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-200'
                        >
                            <div>
                                <h3 className='text-lg font-medium'>{expense.name}</h3>
                                <p className='text-primary'>
                                    ${expense.amount.toFixed(2)} - {" "}
                                    {format(expense.date, "dd/MM/yyyy")}
                                </p>
                            </div>
                            <div className='flex gap-2'>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditExpense(expense.id)}
                                >
                                    <FilePenIcon className='w-5 h-5'/>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteExpense(expense.id)}
                                >
                                    <TrashIcon className='w-5 h-5'/>
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>

            {/* Floating add expense button */}
            <div className='fixed bottom-6 right-6'>
                <Button
                    size="icon"
                    className='rounded-full shadow-lg'
                    onClick={() => {
                        setShowModal(true);
                        setIsEditing(false);
                        resetForm();
                    }}
                >
                    <PlusIcon className='w-6 h-6'/>
                </Button>
            </div>

            {/* Modal dialog for adding/editing expenses */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className='bg-card p-6 rounded-lg shadow w-full max-w-md'>
                    <DialogHeader>
                        <DialogTitle className='text-lg font-semibold'>
                            {isEditing ? "Edit Expense" : "Add Expense"}
                        </DialogTitle>
                    </DialogHeader>
                    <div>
                        <div className='grid gap-4'>
                            {/* Expense name input */}
                            <div className='grid gap-2'>
                                <Label htmlFor='name'>Expense Name</Label>
                                <Input
                                    id='name'
                                    value={newExpense.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Expense amount input */}
                            <div className='grid gap-2'>
                                <Label htmlFor='amount'>Amount</Label>
                                <Input
                                    id='amount'
                                    type='number'
                                    value={newExpense.amount}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Expense date input */}
                            <div>
                                <Label htmlFor='date'>Date</Label>
                                <Input
                                    id='date'
                                    type='date'
                                    value={newExpense.date.toISOString().slice(0, 10)}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Modal footer with action buttons */}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button onClick={isEditing ? handleSaveEditExpense : handleAddExpense}>
                            {isEditing ? "Save Changes" : "Add Expense"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    </>
  )
}
