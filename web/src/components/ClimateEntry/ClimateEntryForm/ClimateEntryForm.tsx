import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditClimateEntryById, UpdateClimateEntryInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormClimateEntry = NonNullable<EditClimateEntryById['climateEntry']>

interface ClimateEntryFormProps {
  climateEntry?: EditClimateEntryById['climateEntry']
  onSave: (data: UpdateClimateEntryInput, id?: FormClimateEntry['id']) => void
  error: RWGqlError
  loading: boolean
}

const ClimateEntryForm = (props: ClimateEntryFormProps) => {
  const onSubmit = (data: FormClimateEntry) => {
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.climateEntry?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormClimateEntry> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="stationId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Station id
        </Label>
        
          <TextField
            name="stationId"
            defaultValue={props.climateEntry?.stationId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="stationId" className="rw-field-error" />

        <Label
          name="topic"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Topic
        </Label>
        
          <TextField
            name="topic"
            defaultValue={props.climateEntry?.topic}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="topic" className="rw-field-error" />

        <Label
          name="period"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Period
        </Label>
        
          <TextField
            name="period"
            defaultValue={props.climateEntry?.period}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="period" className="rw-field-error" />

        <Label
          name="dataSet"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Data set
        </Label>
        
          <TextField
            name="dataSet"
            defaultValue={props.climateEntry?.dataSet}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="dataSet" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ClimateEntryForm
