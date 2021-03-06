import React, { useEffect, useState } from 'react'
import Styles from './survey-result-styles.scss'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { Footer, Header, Loading, Error } from '@/presentation/components'
import { SurveyResultContext, SurveyResultData } from '@/presentation/pages/survey-result/components'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState((prevState) => ({ ...prevState, surveyResult: null, isLoading: false, error: error.message }))
  })

  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const onAnswer = (answer: string): void => {
    if (state.isLoading) {
      return
    }
    setState(prevValues => ({ ...prevValues, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then(surveyResult => setState(prevValues => ({ ...prevValues, isLoading: false, surveyResult })))
      .catch(handleError)
  }

  const reload = (): void => {
    setState((prevValues) => ({ isLoading: false, surveyResult: null, error: '', reload: !prevValues.reload }))
  }

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(prevState => ({ ...prevState, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <div data-testid="survey-result" className={Styles.contentWrap}>
          {state.surveyResult && (<SurveyResultData surveyResult={state.surveyResult} />)}
          {state.isLoading && (<Loading />)}
          {state.error && (<Error error={state.error} reload={reload} />)}
        </div>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  )
}

export default SurveyResult
