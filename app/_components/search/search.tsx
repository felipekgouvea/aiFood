'use client'

import { SearchIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'

const createFormSchema = z.object({
  search: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .trim(),
})

interface SearchProps {
  defaultValues?: z.infer<typeof createFormSchema>
}

type CreateFormSchema = z.infer<typeof createFormSchema>

const Search = ({ defaultValues }: SearchProps) => {
  const router = useRouter()

  const form = useForm<CreateFormSchema>({
    resolver: zodResolver(createFormSchema),
    defaultValues,
  })

  const handleSubmit = (data: CreateFormSchema) => {
    router.push(`/restaurants?search=${data.search}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Form {...form}>
        <form
          className="flex w-full gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="border-none"
                    placeholder="Busque por um restaurante"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button size="icon" type="submit">
            <SearchIcon size={20} />
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Search
