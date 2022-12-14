const initialState = {
  dogs: [],
  allDogsCopy: [],
  orderByTemperament: [],
  temperaments: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogsCopy: action.payload,
        orderByTemperament: action.payload,
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
        // es lo que me devuelve la funcion ( para mi caso lo que hay en mi routa de back '/temperaments') me traiga todos los temperamentos
      };
    case "FILTER_BY_WEIGHT":
      const sortWeight =
        action.payload === "weight_max"
          ? state.dogs.sort(
              (prev, next) => Number(next.weight_max) - Number(prev.weight_max)
            )
          : action.payload === "weight_min"
          ? state.dogs.sort(
              (prev, next) => Number(prev.weight_min) - Number(next.weight_min)
            )
          : (action.payload = "all");
      return {
        ...state,
        dogs: action.payload === "all" ? state.dogs : sortWeight,
      };

    case "FILTER_CREATED":
      const createdFilter =
        action.payload === "created"
          ? state.allDogsCopy.filter((el) => el.createdInDB)
          : action.payload === "api"
          ? state.allDogsCopy.filter((el) => !el.createdInDB)
          : state.allDogsCopy;
      return {
        ...state,
        dogs: createdFilter,
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "desc"
          ? state.dogs.sort(function (a, b) {
              if (a.name.toUpperCase() > b.name.toUpperCase()) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name.toUpperCase() > b.name.toUpperCase()) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedArr,
      };

    case "FILTER_BY_TEMPERAMENT":
      const allDogs3 = state.dogs;
      const tempDogs = allDogs3.filter((dog) => {
        if (dog.temperaments) {
          const temperament = dog.temperaments.map((dog) => dog.name);
          return temperament.includes(action.payload);
        } else if (dog.temperament) {
          return dog.temperament.includes(action.payload);
        }
        return console.log("null");
      });
     

      return {
        ...state,
        dogs: action.payload === "all" ? state.allDogsCopy : tempDogs,
      };
    case "GET_NAME_DOGS":
      return {
        ...state,
        dogs: action.payload,
      };

    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
      case 'DELETE_DOG':
        return {
          ...state,
          dogs: state.dogs.filter((d) => d?.name !== action.payload),
        };
    default:
      return state;
  }
}

export default rootReducer;
