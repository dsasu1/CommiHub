import { Pipe, PipeTransform } from '@angular/core';
import { PropertyInformation } from '../../property/model/property.model';

@Pipe({
  name : 'AddressFormat'
})

export class AddressFormatPipe implements PipeTransform {
  transform(value: PropertyInformation) : string{
    let result = "";
    if (value != null) {
      if (value.streetOne != null) {
        result += value.streetOne + " <br/> ";
      }
      if (value.streetTwo != null && value.streetTwo.length > 0) {
        result += value.streetTwo + " <br/> ";
      }

      result += value.zipCode.city + ", " + value.zipCode.province;

      if (value.zipCode.code != null &&  value.zipCode.code.length > 0) {

        result += " " + value.zipCode.code + " "; 
      }

      if (value.zipCode.county != null && value.zipCode.county.length > 0) {
        result += " <br/> " + value.zipCode.county + " ";
      }

      result +=  value.zipCode.countryCode; 

    }

    return result;
  }

}
