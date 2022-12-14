import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    axios
      .get("/dogs")
      .then((res) => {
        dispatch({
          type: "GET_DOGS",
          payload: res.data,
        });
      })
      .catch((error) => console.log(error));
  };
}
// try {
//     var json = await axios.get('http://localhost:3001/dogs',{});
// return dispatch({
//     type: 'GET_DOGS',
//     payload: json.data

// })
// } catch (error) {
//     console.log(error)

// }
export function filterDogsByWeight(payload) {
  try {
    return {
      type: "FILTER_BY_WEIGHT",
      payload,
    };
  } catch (error) {
    console.log(error);
  }
}

export function filterCreated(payload) {
  try {
    return {
      type: "FILTER_CREATED",
      payload,
    };
  } catch (error) {
    console.log(error);
  }
}

export function orderByName(payload) {
  try {
    return {
      type: "ORDER_BY_NAME",
      payload,
    };
  } catch (error) {
    console.log(error);
  }
}

export function filterByTemperament(payload) {
  try {
    return {
      type: "FILTER_BY_TEMPERAMENT",
      payload,
    };
  } catch (error) {
    console.log(error);
  }
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
      var temperaments = await axios.get("/temperaments");

      var temperamentsMap = temperaments.data.map((t) => t.name);

      return dispatch({
        type: "GET_TEMPERAMENTS",
        payload: temperamentsMap,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getNameDogs(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/dogs?name=" + name);
      return dispatch({
        type: "GET_NAME_DOGS",
        payload: json.data,
      });
    } catch (error) {
      alert("Dog doesnt exist");
    }
  };
}

export function postDog(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/dogs", payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}
export function deleteDog(payload){
  return async function (dispatch){
    try {
      await axios.delete(`/dogs/${payload}`);
      return dispatch({
        type: 'DELETE_DOG',
        payload: payload
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getDetail(id) {
  return function (dispatch) {
   
     axios.get("/dogs/" + id).then(response => 
     dispatch({
      type: "GET_DETAILS",
      payload: response.data
    })
     ).catch(()=>{
      alert('dog not found')
      window.location.replace('https://soyhenry-pi-dogs.vercel.app/dogs')
     })
  }
}

