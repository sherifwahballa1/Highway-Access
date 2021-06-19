# Highway-Access
> #### System manages the cars of employees through parking access card

* `npm install`  
* `npm start`  
>The server should run on <span style="color:orange; font-weight: bold;">http://locahost:5000</span>


___
![alt text][logo]


[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Highway-Access endpoints"
## Endpoints

- `POST /api/employee` (for creating employees for testing...) 
  
  **payload**
    ```json
    {
        "name": "employee name",
        "age": "employee age",
        "position": "employee position"
    }
    ```

 
___

- `POST /api/car` (create new registration for a car )
  
    **payload**  
    ```json
    {
        "brand": "Brand name",
        "model": "Model year",
        "plateNo": "Plate Number",
        "employeeID": "Employee ID"
    }
    ```
___

- `PATCH /api/car` (update car info)  
  
    **payload**
    ```json
    {
        "brand": "Brand name (option)",
        "model": "Model year (option)",
        "plateNo": "Plate number (option)",
        "carID": "The car id (required)"
    }
    ```
___

- `GET /api/car/${carID}` (get car info by id) 
   
    **`Query params`**

    * <span style="font-weight: 500; color: orange;">`carID` : </span> (The car need to get it's info)
___

- `GET /api/car?pageNo=${pageNumber}&limit=${limitNumber}` (get cars info)  
  
    **Query params**

     * <span style="font-weight: 500; color: orange;">`pageNo` : </span> Used for pagination (default 0 if user not provid in request)
     * <span style="font-weight: 500; color: orange;">`limit` : </span> (optional with default 20 per request if user not set)
___
- `DELETE /api/car/${carID}` (delete car info by id)
    
    **Query params**

    * <span style="font-weight: 500; color: orange;">`carID` : </span> (The car need to remove its info)
    

___
- `POST /api/card` (create a new access card)  
  
    **payload**
    ```json
    {
        "carID": "The car need to create access card to it"
    }
    ```

___
- `POST /api/card/${carID}` (withdraw from car's card balance when passing through highway) 
    
    **Query params**

    * <span style="font-weight: 500; color: orange;">`carID` : </span> (The car need to charge it's balance)

