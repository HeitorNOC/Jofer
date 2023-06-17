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
            <h1>Cordeis</h1>
            <CordeisOptions>
              <OptionsLeft>
                cordeis
              </OptionsLeft>
              <OptionsRight>
                input
              </OptionsRight>
            </CordeisOptions>
            <CordeisContent>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front" >

                    <img src={query.data.data[0].frontCoverUrl} alt="" />

                  </div>
                  <div className="flip-card-back">
                    <img src={query.data.data[0].backCoverUrl} alt="" />
                  </div>
                </div>
              </div>
            </CordeisContent>
          </CordeisContainer>
        ) : (
          <h1>carregando...</h1>
        )
      }

    </>
  )
}