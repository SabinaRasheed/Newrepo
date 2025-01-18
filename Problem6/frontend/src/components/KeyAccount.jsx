import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState, useRef, useEffect } from "react";
import { FiMic, FiMicOff } from "react-icons/fi";

const KeyAccount = () => {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const [currentField, setCurrentField] = useState(null);
    let currfield = ""

    const checkSpeechRecognition = () => {
        if ('webkitSpeechRecognition' in window) {
            return true;
        }
        alert('Speech recognition is not supported in this browser');
        return false;
    };

    useEffect(() => {
        if (checkSpeechRecognition()) {
            recognitionRef.current = new window.webkitSpeechRecognition();
            recognitionRef.current.continuous = false; // Stop after the first result
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onstart = () => {
                setIsListening(true);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current.onresult = (event) => {
                const result = event.results[event.resultIndex];
                if (result.isFinal) {
                    const spokenText = result[0].transcript;


                    if (currfield === 'name') {
                        setFormData((prev) => ({ ...prev, name: spokenText }));
                    } else if (currfield === 'email') {
                        setFormData((prev) => ({ ...prev, email: spokenText }));
                    }
                }
            };
        }
    },);

    const toggleListening = (field) => {
        currfield = field;
        console.log("🚀 ~ toggleListening ~ currfield:", currfield)
        setCurrentField(field);


        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/company", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: formData.name, email: formData.email }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit data');
            }
            alert("Key Account successfully added")
            setFormData({ name: '', email: '' });
        } catch (err) {
            console.error('Error:', err);
            alert('There was an error submitting the form.');
        }
    }


    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button color="gray" variant="outline" highContrast>
                        Add Key Account
                    </Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Add New Key Account</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Enter the company details
                    </Dialog.Description>
                    <form onSubmit={handleSubmit}>
                        <Flex direction="column" gap="3">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Company Name
                                </Text>
                                <div className="flex">
                                    <TextField.Root
                                        className="flex-1"
                                        placeholder="XYZ Company"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                    />
                                    <div>
                                        <button
                                            onClick={() => toggleListening('name')}
                                            className="flex items-center justify-center ml-3 w-8 h-8 bg-gray-200 rounded-full shadow hover:bg-gray-300 transition"
                                            aria-label={isListening && currentField === 'name' ? 'Stop Listening' : 'Start Listening'}
                                        >
                                            {isListening && currentField === 'name' ? (
                                                <FiMicOff size={16} color="red" />
                                            ) : (
                                                <FiMic size={16} color="green" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </label>
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Email
                                </Text>
                                <div className="flex">
                                    <TextField.Root
                                        className="flex-1"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                        placeholder="company@gmail.com"
                                        type="email"
                                    />
                                    <div>
                                        <button
                                            onClick={() => toggleListening('email')}
                                            className="flex items-center justify-center ml-3 w-8 h-8 bg-gray-200 rounded-full shadow hover:bg-gray-300 transition"
                                            aria-label={isListening && currentField === 'email' ? 'Stop Listening' : 'Start Listening'}
                                        >
                                            {isListening && currentField === 'email' ? (
                                                <FiMicOff size={16} color="red" />
                                            ) : (
                                                <FiMic size={16} color="green" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </label>
                        </Flex>

                        <Flex gap="3" mt="5" justify="end">
                            <Dialog.Close>
                                <Button variant="soft" color="gray" onClick={() => {
                                    setFormData({
                                        name: "",
                                        email: "",
                                    })
                                }}>
                                    Cancel
                                </Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button type="submit">Save</Button>
                            </Dialog.Close>
                        </Flex>


                    </form>
                </Dialog.Content>
            </Dialog.Root>
        </>
    );
};

export default KeyAccount;
