import CONFIG from '@/config';
import { Resend } from 'resend';

export const mailService = new Resend(CONFIG.EMAIL);