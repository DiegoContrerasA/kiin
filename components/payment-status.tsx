import { PaymentStatus } from '@/types/localdb'
import { buttonVariants } from '@/components/ui/button'
import { parseId } from '@/lib/id-serializer'

interface Props {
  status: PaymentStatus | null
  reservationId: string
}

type UIState = 'success' | 'pending' | 'error'

function mapStatusToUI(status: PaymentStatus | null): UIState {
  if (status === PaymentStatus.APPLIED) return 'success'
  if (status === PaymentStatus.IN_PROCESS) return 'pending'
  return 'error'
}

export default function PaymentStatusDisplay({ status, reservationId }: Props) {
  const uiState = mapStatusToUI(status)

  const whatsappUrl = `https://api.whatsapp.com/send?phone=573232230942&text=${encodeURIComponent(
    `Hola Kiin Living, necesito ayuda con mi reservación. Código: ${parseId(reservationId, 'BK')}`
  )}`

  const config = {
    success: {
      color: 'bg-green-500',
      title: 'Reservation Confirmed',
      message: 'Your payment was successful and your reservation is confirmed.',
      showWhatsApp: false,
    },
    pending: {
      color: 'bg-yellow-500',
      title: 'Processing Payment',
      message: 'We are confirming your payment. This may take a few seconds...',
      showWhatsApp: false,
      loading: true,
    },
    error: {
      color: 'bg-red-500',
      title: 'Payment Issue',
      message: 'There was a problem with your payment. Please contact support.',
      showWhatsApp: true,
    },
  }[uiState]

  return (
    <div className="bg-brand/5 rounded-lg border  p-6">
      <div className="flex items-center gap-3">
        <div
          className={`w-4 h-4 rounded-full ${config.color} ${
            config.loading ? 'animate-pulse' : ''
          }`}
        />

        <div className="flex-1">
          <h3 className="font-semibold text-sm uppercase">
            {config.title}
          </h3>

          <p className="text-sm mb-4">
            {config.message}
          </p>

          {config.showWhatsApp && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                size: 'sm',
                variant: 'destructive',
              })}
            >
              Contact Support on WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  )
}