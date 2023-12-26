import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid} from "uuid";
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
    
    private cars : Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Corolla'
        // }
    ];

    public getAll(){
        return this.cars;
    }

    public getOneById(id:string){
        
        var result = this.cars.find(x => x.id === id);
        
        if(!result) 
            throw new NotFoundException(`Car with id ${id} not found`);
        
        
        return result;
        
    }

    create( createCarDto: CreateCarDto) {

        const car : Car = {
            id : uuid(),
            // ...CreateCarDto con este operador express
            //(exparce las propiedades de createCarDto en el nuevo objeto que estoy utilizando)
            // y no tengo que hacer lo de abajo propiedad por propiedad
            brand: createCarDto.brand,
            model: createCarDto.model,
        };
        
        this.cars.push(car);
        return car;
    }
    
    update(id: string, updateCarDto: UpdateCarDto) {
        
        let carDb = this.getOneById(id);

        this.cars = this.cars.map( car => {

            if (car.id === id) {
                carDb = {
                    ...carDb,  //exparce todas las propiedades de carDb en el nuevo objeto que estoy creando
                    ...updateCarDto, //exparso las propiedades updateCarDto (esto sobreescribe las propiedades anteriores esparcidas)
                    id //luego reeemplaso el id por el que me mandan(esto en caso que el id que viene en mi objeto sea un UUID pero no sea el mismo que me mandan en la url)
                }
                return carDb;
            }
            return car;
        })

        return carDb ;
    }
    
    deleteCars(id: string) {
      
        let carDb = this.getOneById(id);
        // var index = this.cars.indexOf(carDb);
        // this.cars.splice(index, 1);
        this.cars = this.cars.filter(x => x.id !== id); 
    }

    fillCarsWithseedData( cars: Car[]){
        this.cars = cars;
      }
}
