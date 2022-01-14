import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    
    render(<ContactForm/>)
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
    const input = "Abcd";
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, input)
    const errorMessage = await screen.findAllByTestId(/error/i);
    expect(errorMessage).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)
    const submit = screen.getByRole(/button/i);
    userEvent.click(submit)

    await waitFor(()=>{
        const errorMessage = screen.queryAllByTestId("error");
        expect(errorMessage).toHaveLength(3)         
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, "Abcde")
    const lastName = screen.getByLabelText(/last name/i);
    userEvent.type(lastName, "Abcde")

    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, "a")

    const submit = screen.getByRole(/button/i);
    userEvent.click(submit)

    const error = await screen.getAllByTestId('error')
    expect(error).toHaveLength(1)
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, "Abcde")
    const lastName = screen.getByLabelText(/last name/i);
    userEvent.type(lastName, "Abcde")

    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, "a.com")

    const submit = screen.getByRole(/button/i);
    userEvent.click(submit)

    const error = screen.getByText(/email must be a valid email address/i)
    expect(error).toBeInTheDocument()
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, "Abcde")
    const lastName = screen.getByLabelText(/last name/i);
    userEvent.type(lastName, "")

    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, "aaa@gmail.com")

    const submit = screen.getByRole(/button/i);
    userEvent.click(submit)

    const error = screen.getByText(/lastName is a required field/i)
    expect(error).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, "Abcde")
    const lastName = screen.getByLabelText(/last name/i);
    userEvent.type(lastName, "Abcdef")

    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, "aaa@gmail.com")

    const submit = screen.getByRole(/button/i);
    userEvent.click(submit)

    const outputFirstName = screen.getByText("Abcde")
    const outputLastName = screen.getByText("Abcdef")
    const outputEmail = screen.getByText("aaa@gmail.com")

    expect(outputFirstName).toBeInTheDocument()
    expect(outputLastName).toBeInTheDocument()
    expect(outputEmail).toBeInTheDocument()
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, "Abcde")
    const lastName = screen.getByLabelText(/last name/i);
    userEvent.type(lastName, "Abcdef")

    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, "aaa@gmail.com")

    const note = screen.getByLabelText(/message/i)
    userEvent.type(note, "This is my note.")

    const submit = screen.getByRole(/button/i);
    userEvent.click(submit)

    const outputFirstName = screen.getByText("Abcde")
    const outputLastName = screen.getByText("Abcdef")
    const outputEmail = screen.getByText("aaa@gmail.com")
    const outputNote = screen.getByText("This is my note.")

    expect(outputFirstName).toBeInTheDocument()
    expect(outputLastName).toBeInTheDocument()
    expect(outputEmail).toBeInTheDocument()
    expect(outputNote).toBeInTheDocument()
});