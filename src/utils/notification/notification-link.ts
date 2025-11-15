// utils/notification-link.ts
import { toast } from 'sonner'
import { NotificationService } from '@/api/services/user/notification/notification-service'
import { playSoundNotification } from './play-sound'
import { usePaginationNotificationStore } from '@/store/notification/use-pagination-store'

export class LinkNotifier {
  constructor(private service: NotificationService) {}

  async success(link: string, method: 'create' | 'update' | 'delete' = 'create', userId?: string) {
    const { currentPage, limits, filter } = usePaginationNotificationStore.getState()

    playSoundNotification('success')

    const newMessage = {
      message: `Link ${link} ${
        method == 'create' ? 'Criado' : method == 'delete' ? 'Deletado' : 'Editado'
      } com sucesso!`,
      type: 'success',
      title: 'Link Editado',
      userId,
      link: `${process.env.NEXT_PUBLIC_URL_API}/${link}`,
    } as const

    if (this.service.queryClient) {
      this.service.queryClient.invalidateQueries({
        queryKey: ['get-all-notification', currentPage, limits, filter],
      })
    }
    await this.service.createNotification({
      ...newMessage,
    })

    toast.success(
      method == 'create'
        ? 'Link encurtado com sucesso!'
        : method == 'delete'
        ? 'Link deletado com sucesso'
        : 'Link Editado com sucesso!',
      {
        richColors: true,
        duration: 4000,
        action: {
          label: link,
          onClick: () => window.open(`${process.env.NEXT_PUBLIC_URL_API}/${link}`, '_blank'),
        },
      },
    )
  }

  async error(link?: string, errorMessage?: string) {
    playSoundNotification('error')
    await this.service.createNotification({
      message: link ? `Falha ao criar o link ${link}` : 'Falha ao criar link encurtado',
      type: 'error',
      title: 'Erro ao criar link',
    })

    toast.dismiss()
    toast.error(errorMessage || 'Erro ao encurtar o link, tente novamente mais tarde.', {
      richColors: true,
      duration: 4000,
    })
  }
}
