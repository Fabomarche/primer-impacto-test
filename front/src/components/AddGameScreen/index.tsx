import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useAddVideoGame } from '../../hooks/useAddVideoGame'
import { CustomNotification } from '../CustomNotification'

import './style.scss'

const AddGameScreen = () => {
    const [form] = Form.useForm();
    const [gameName, setGameName] = useState('')
    const { handleAdd, isLoading, addError } = useAddVideoGame()

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGameName(e.target.value)
    }

    const handleOnFinish = () => {
        const values = form.getFieldsValue()
        handleAdd(values)
        CustomNotification({type: 'success', message: 'Success', description:'Video Game saved successfully'})
        setGameName('')
        form.resetFields()
    }

    if (addError) {
        return  CustomNotification({
            type: 'error',
            description: 'An error occurred while saving the video game:',
            message: addError.message,
        });
    }

    return (
        <div className='add-game-screen-container'>
            <h1>Add a new Video Game</h1>
            <Form 
                form={form} 
                layout="inline" 
                className='add-game-form'
                onFinish={handleOnFinish}
            >
                <Form.Item
                    label="Name" 
                    name='name' 
                    rules={[{ required: true, message: 'Please input the videogame name!' }]}
                >
                    <Input 
                        type='text' 
                        value={gameName} 
                        onChange={handleNameChange}
                        name='name'
                    />
                </Form.Item>
                <div className='form-inner-container'>
                    <Form.Item
                        label="Genre" 
                        name='genre'
                    >
                        <Input 
                            type='text'  
                        />
                    </Form.Item>
                    <Form.Item
                        label="Release Date" 
                        name='releaseDate'
                    >
                        <Input type='date'/>
                    </Form.Item>
                    <Form.Item
                        label="Metacritic Score" 
                        name='metacriticScore'
                    >
                        <Input 
                            type='number' 
                        />
                    </Form.Item>
                </div>
                <Form.Item className='button-container'>
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={!gameName || isLoading}
                    >
                        {isLoading ? ' Loading...' : 'Save Video Game' }
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddGameScreen