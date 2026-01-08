import { toast } from "sonner"

export const useToast = () => {
  return {
    toast: (props: { title?: string; description: string; action?: React.ReactNode }) => {
      toast(props.description, {
        description: props.title,
        action: props.action,
      })
    },
  }
}
