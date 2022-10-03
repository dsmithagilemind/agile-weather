import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditStationById, UpdateStationInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormStation = NonNullable<EditStationById['station']>

interface StationFormProps {
  station?: EditStationById['station']
  onSave: (data: UpdateStationInput, id?: FormStation['id']) => void
  error: RWGqlError
  loading: boolean
}

const StationForm = (props: StationFormProps) => {
  const onSubmit = (data: FormStation) => {
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.station?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormStation> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="code"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Code
        </Label>
        
          <TextField
            name="code"
            defaultValue={props.station?.code}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="code" className="rw-field-error" />

        <Label
          name="latitude"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Latitude
        </Label>
        
          <TextField
            name="latitude"
            defaultValue={props.station?.latitude}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ valueAsNumber: true }}
          />
        

        <FieldError name="latitude" className="rw-field-error" />

        <Label
          name="longitude"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Longitude
        </Label>
        
          <TextField
            name="longitude"
            defaultValue={props.station?.longitude}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ valueAsNumber: true }}
          />
        

        <FieldError name="longitude" className="rw-field-error" />

        <Label
          name="elevation"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Elevation
        </Label>
        
          <TextField
            name="elevation"
            defaultValue={props.station?.elevation}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ valueAsNumber: true }}
          />
        

        <FieldError name="elevation" className="rw-field-error" />

        <Label
          name="gsn"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Gsn
        </Label>
        
          <TextField
            name="gsn"
            defaultValue={props.station?.gsn}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="gsn" className="rw-field-error" />

        <Label
          name="hcn"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Hcn
        </Label>
        
          <TextField
            name="hcn"
            defaultValue={props.station?.hcn}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="hcn" className="rw-field-error" />

        <Label
          name="wmoid"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Wmoid
        </Label>
        
          <TextField
            name="wmoid"
            defaultValue={props.station?.wmoid}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="wmoid" className="rw-field-error" />

        <Label
          name="stationName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Station name
        </Label>
        
          <TextField
            name="stationName"
            defaultValue={props.station?.stationName}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="stationName" className="rw-field-error" />

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

export default StationForm
