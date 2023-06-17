import { api } from '@/lib/axios'
import { CordeisContainer, CordeisContent, CordeisOptions, OptionsLeft, OptionsRight } from './styles'
import { useQuery } from '@tanstack/react-query'

export default function Cordeis() {
  const query = useQuery({
    queryKey: ['cordeis'],
    queryFn: () => {
      return api.get('/cordeis')
    }
  })

  return (
    <>
      {
        query.data != undefined ? (
          <CordeisContainer>
            <CordeisOptions>
              <OptionsLeft>

              </OptionsLeft>
              <OptionsRight>

              </OptionsRight>
            </CordeisOptions>
            <CordeisContent>

            </CordeisContent>
          </CordeisContainer>
        ) : (
          <h1>carregando...</h1>
        )
      }

    </>
  )
}