"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone } from "lucide-react"

const Contato: React.FC = () => {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        telefone: "",
        assunto: "",
        mensagem: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aqui você implementaria o envio do formulário
        console.log("Formulário enviado:", formData)
        alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
        setFormData({
            nome: "",
            email: "",
            telefone: "",
            assunto: "",
            mensagem: "",
        })
    }

    return (
        <div className="pt-24">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-[#D10A11] mb-6">Entre em Contato</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Estamos aqui para ajudar você a dar o próximo passo em sua jornada de crescimento
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl font-bold text-[#D10A11] mb-8">Fale Conosco</h2>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-[#D10A11]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">E-mail</h3>
                                        <p className="text-gray-600">contato@geracaomilionaria.com</p>
                                        <p className="text-gray-600">suporte@geracaomilionaria.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-[#F7B32B]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Telefone</h3>
                                        <p className="text-gray-600">(11) 99999-9999</p>
                                        <p className="text-gray-600">(11) 3333-3333</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Contato