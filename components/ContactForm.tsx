'use client';

import { useState } from 'react';
import { useThemeStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { RunningFigure } from '@/components/RunningFigure';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  submit?: string;
}

export function ContactForm() {
  const language = useThemeStore((state) => state.language);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = getTranslation(language, 'fieldRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = getTranslation(language, 'fieldRequired');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = getTranslation(language, 'invalidEmail');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = getTranslation(language, 'fieldRequired');
    }

    if (!formData.message.trim()) {
      newErrors.message = getTranslation(language, 'fieldRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      const newErrors = { ...errors };
      delete newErrors[name as keyof FormErrors];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors((prev) => ({
          ...prev,
          submit: errorData.error || getTranslation(language, 'submissionError'),
        }));
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setErrors({});
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: getTranslation(language, 'submissionError'),
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 p-6 bg-(--color-surface) border border-(--color-success) rounded-lg"
          >
            <div className="flex flex-col items-center text-center">
              <p className="text-(--color-success) font-semibold mb-4">{getTranslation(language, 'successMessage')}</p>
              <RunningFigure />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {errors.submit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-4 bg-(--color-surface) border border-(--color-danger) rounded-lg"
          >
            <p className="text-(--color-danger) text-sm font-medium">{errors.submit}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div>
          <label htmlFor="name" className="block font-bold text-(--color-text) mb-2">
            {getTranslation(language, 'nameLabel')}
            <span className="text-(--color-danger) ml-1">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={getTranslation(language, 'namePlaceholder')}
            className={`w-full px-4 py-3 bg-(--color-surface) border rounded-lg text-(--color-text) placeholder-(--color-muted-text) focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:ring-offset-2 transition-colors duration-300 ${
              errors.name ? 'border-(--color-danger)' : 'border-(--color-border)'
            }`}
          />
          {errors.name && <p className="text-(--color-danger) text-sm mt-2">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block font-bold text-(--color-text) mb-2">
            {getTranslation(language, 'emailLabel')}
            <span className="text-(--color-danger) ml-1">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={getTranslation(language, 'emailPlaceholder')}
            className={`w-full px-4 py-3 bg-(--color-surface) border rounded-lg text-(--color-text) placeholder-(--color-muted-text) focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:ring-offset-2 transition-colors duration-300 ${
              errors.email ? 'border-(--color-danger)' : 'border-(--color-border)'
            }`}
          />
          {errors.email && <p className="text-(--color-danger) text-sm mt-2">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="subject" className="block font-bold text-(--color-text) mb-2">
            {getTranslation(language, 'subjectLabel')}
            <span className="text-(--color-danger) ml-1">*</span>
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder={getTranslation(language, 'subjectPlaceholder')}
            className={`w-full px-4 py-3 bg-(--color-surface) border rounded-lg text-(--color-text) placeholder-(--color-muted-text) focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:ring-offset-2 transition-colors duration-300 ${
              errors.subject ? 'border-(--color-danger)' : 'border-(--color-border)'
            }`}
          />
          {errors.subject && <p className="text-(--color-danger) text-sm mt-2">{errors.subject}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block font-bold text-(--color-text) mb-2">
            {getTranslation(language, 'messageLabel')}
            <span className="text-(--color-danger) ml-1">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder={getTranslation(language, 'messagePlaceholder')}
            rows={6}
            className={`w-full px-4 py-3 bg-(--color-surface) border rounded-lg text-(--color-text) placeholder-(--color-muted-text) focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:ring-offset-2 transition-colors duration-300 resize-none ${
              errors.message ? 'border-(--color-danger)' : 'border-(--color-border)'
            }`}
          />
          {errors.message && <p className="text-(--color-danger) text-sm mt-2">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-(--color-accent) text-(--color-background) font-semibold rounded-lg transition-colors duration-300 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:ring-offset-2 dark:focus:ring-offset-(--color-primary) disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? getTranslation(language, 'submitting') : getTranslation(language, 'submitButton')}
        </button>
      </form>
    </div>
  );
}
