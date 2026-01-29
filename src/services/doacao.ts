import api from "./api";

export interface DoacaoFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    isRecurring: boolean;
    method: string;
    comprovativo: File | null;
}

export interface ValidationError {
    field: string;
    message: string;
    type: "error" | "warning";
}

export const submitDoacao = async (formData: DoacaoFormData) => {
    try {
        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key !== "comprovativo" && value !== null) {
                data.append(key, String(value));
            }
        });

        if (formData.comprovativo) {
            data.append("comprovativo", formData.comprovativo);
        }

        const response = await api.post("/doacao", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Erro ao enviar doação: ${error.message}`);
        }
        throw error;
    }
};


const validateNomeCompleto = (nome: string): { valid: boolean; message: string; type: "error" | "warning" } => {
    const trimmed = nome.trim();

    if (trimmed.length < 3) {
        return {
            valid: false,
            message: "Nome deve ter pelo menos 3 caracteres",
            type: "error",
        };
    }

    if (trimmed.length > 100) {
        return {
            valid: false,
            message: "Nome não pode ter mais de 100 caracteres",
            type: "error",
        };
    }

    if (!/^[a-záàâãéèêíïóôõöúçñ\s'-]+$/i.test(trimmed)) {
        return {
            valid: false,
            message: "Nome contém caracteres inválidos",
            type: "error",
        };
    }

    if (trimmed.split(" ").length < 2) {
        return {
            valid: false,
            message: "Por favor, insira nome e sobrenome",
            type: "error",
        };
    }

    return { valid: true, message: "", type: "error" };
};

const validateEmail = (email: string): { valid: boolean; message: string; type: "error" | "warning" } => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return {
            valid: false,
            message: "Formato de email inválido (ex: seu@email.com)",
            type: "error",
        };
    }

    if (email.length > 254) {
        return {
            valid: false,
            message: "Email muito longo",
            type: "error",
        };
    }

    const commonDomains = [
        "gmail.com",
        "hotmail.com",
        "outlook.com",
        "yahoo.com",
        "mail.com",
        "icloud.com",
    ];
    const domain = email.split("@")[1]?.toLowerCase();

    if (domain && !commonDomains.includes(domain) && !domain.includes(".com") && !domain.includes(".pt") && !domain.includes(".ao")) {
        return {
            valid: false,
            message: "Domínio de email parece inválido. Verifique se está correto",
            type: "warning",
        };
    }

    return { valid: true, message: "", type: "error" };
};

const validateTelefone = (telefone: string): { valid: boolean; message: string; type: "error" | "warning" } => {
    if (!telefone?.trim()) {
        return { valid: true, message: "", type: "error" };
    }

    const cleanedPhone = telefone.replace(/\D/g, "");

    if (cleanedPhone.length < 9) {
        return {
            valid: false,
            message: "Telefone deve ter pelo menos 9 dígitos",
            type: "error",
        };
    }

    if (cleanedPhone.length > 15) {
        return {
            valid: false,
            message: "Número de telefone muito longo",
            type: "error",
        };
    }

    // Detectar se é número de Angola
    if (!cleanedPhone.startsWith("9") && !cleanedPhone.startsWith("244")) {
        return {
            valid: false,
            message: "Telefone parece não ser de Angola (deve começar com 9 ou 244)",
            type: "warning",
        };
    }

    return { valid: true, message: "", type: "error" };
};

const validateMensagem = (mensagem: string): { valid: boolean; message: string; type: "error" | "warning" } => {
    if (!mensagem?.trim()) {
        return { valid: true, message: "", type: "error" };
    }

    if (mensagem.length > 500) {
        return {
            valid: false,
            message: "Mensagem não pode ter mais de 500 caracteres",
            type: "error",
        };
    }

    if (mensagem.length < 5) {
        return {
            valid: false,
            message: "Mensagem deve ter pelo menos 5 caracteres",
            type: "warning",
        };
    }

    return { valid: true, message: "", type: "error" };
};

const validateComprovativo = (comprovativo: File | null): { valid: boolean; message: string; type: "error" | "warning" } => {
    if (!comprovativo) {
        return {
            valid: false,
            message: "Comprovativo é obrigatório",
            type: "error",
        };
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!allowedTypes.includes(comprovativo.type)) {
        return {
            valid: false,
            message: "Formato de imagem não suportado. Use JPEG, PNG ou WebP",
            type: "error",
        };
    }

    if (comprovativo.size > maxSize) {
        return {
            valid: false,
            message: `Imagem muito grande. Tamanho máximo: 5MB (atual: ${(comprovativo.size / 1024 / 1024).toFixed(2)}MB)`,
            type: "error",
        };
    }

    return { valid: true, message: "", type: "error" };
};


export const validateDoacaoForm = (formData: DoacaoFormData): ValidationError[] => {
    const errors: ValidationError[] = [];

 
    if (!formData.name?.trim()) {
        errors.push({
            field: "name",
            message: "Nome completo é obrigatório",
            type: "error",
        });
    } else {
        const nameValidation = validateNomeCompleto(formData.name);
        if (!nameValidation.valid) {
            errors.push({
                field: "name",
                message: nameValidation.message,
                type: nameValidation.type,
            });
        }
    }


    if (!formData.email?.trim()) {
        errors.push({
            field: "email",
            message: "Email é obrigatório",
            type: "error",
        });
    } else {
        const emailValidation = validateEmail(formData.email);
        if (!emailValidation.valid) {
            errors.push({
                field: "email",
                message: emailValidation.message,
                type: emailValidation.type,
            });
        }
    }

    if (formData.phone?.trim()) {
        const phoneValidation = validateTelefone(formData.phone);
        if (!phoneValidation.valid) {
            errors.push({
                field: "phone",
                message: phoneValidation.message,
                type: phoneValidation.type,
            });
        }
    }

    if (formData.message?.trim()) {
        const messageValidation = validateMensagem(formData.message);
        if (!messageValidation.valid) {
            errors.push({
                field: "message",
                message: messageValidation.message,
                type: messageValidation.type,
            });
        }
    }

    if (["bank", "mobile", "other"].includes(formData.method)) {
        const comprovativoValidation = validateComprovativo(formData.comprovativo);
        if (!comprovativoValidation.valid) {
            errors.push({
                field: "comprovativo",
                message: comprovativoValidation.message,
                type: comprovativoValidation.type,
            });
        }
    }

    return errors;
};

