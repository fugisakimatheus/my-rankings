import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'

export default function Ranks() {
  return (
    <main className="p-10">
      <Input placeholder="Informe o nome" leftIcon={<Icon name="FiUser" />} colorScheme="primary" />
    </main>
  )
}
