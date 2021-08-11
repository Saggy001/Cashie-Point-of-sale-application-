
function paginate(array, currentPage, pageSize){
let startIndex = currentPage * pageSize;
let endIndex = startIndex + pageSize;
return array.slice(startIndex, endIndex);
}

function sorting(pageData, sortColumn, sortOrder){
    if(sortOrder === "asc"){
        //ascending
        pageData.sort(function(a,b){
          let i = a[sortColumn].toLowerCase();
          let j = b[sortColumn].toLowerCase();
          if (i > j) return 1;
          if (i < j) return -1;
          return 0;
        });
        return pageData;
      }
      else if(sortOrder === "desc"){
        //descending
        pageData.sort(function(a,b){
          let i = a[sortColumn].toLowerCase();
          let j = b[sortColumn].toLowerCase();
          if (i > j) return -1;
          if (i < j) return 1;
          return 0;
        });
        return pageData;
      }
}

//to highlight current page in paginate
function handlepaginatehighlight(n, currentPage, totalPage){
    if(n===1){
        if(currentPage === 0) return "active";
        return "";
    }
    else if(n===2){
        let value = getValue(currentPage , totalPage);
        if(value === currentPage+1) return "active";
        return "";
    }
    else{
        let lastValue = getLastValue(currentPage , totalPage);
        if(lastValue !== "Next") return "active";
        return "";
    }
}

//get paginate value
function getValue(n, m){
    if(n === 0) return "2";
    else if(n === m-1) return n;
    else return n+1;
}

//get paginate value
function getLastValue(n, m){
    if(n === 0) return "Next";
    else if(n === m-1) return m;
    else return "Next";
}

export {paginate, sorting, getValue, getLastValue, handlepaginatehighlight};




   //const [pageSize, setPageSize] = useState(10);
    //const [currentPage, setCurrentPage] = useState(0);
    //const [sortColumn, setSortColumn] = useState("id");
	//const [sortOrder, setSortOrder] = useState("asc");
    //let pageData = paginate(vehicles, currentPage, pageSize);
    //pageData = pageData.length && sorting(pageData, sortColumn, sortOrder);
    //let totalPage = Math.ceil(vehicles.length / pageSize);

    // //page content change according to pageinate value 
    // const handlePageChange = (value)=> {
    //     if(value === "pre" && currentPage != 0)
    //         setCurrentPage(currentPage-1);
    //     else if(value === "next")
    //         setCurrentPage(currentPage+1);
    //     else if(value === "c" && currentPage == 0)
    //         setCurrentPage(currentPage+1);
    // }

    // //for searching by names
    // const searchfor = (e)=>{
    //     let value = e.target.value.toLowerCase();
    //         let filtered = allvehicles.filter((vehicle)=>{
    //             let a = vehicle.name.toLowerCase();
    //             return a.search(value) !== -1;
    //         });
    //         setStudent(filtered); 
    //         setCurrentPage(0); 
    // }

    // const handlesorting =(key)=>{
    //     console.log(key);
    //     setSortColumn(key);
    //     setSortOrder(sortOrder==="asc"?"desc":"asc");
    // }

    // const handleFiltering =(e)=>{
    //     if(e.target.checked){
    //     let filterdata = allvehicles.filter((vehicle)=> vehicle.verify)
    //     setStudent(filterdata);
    //     setCurrentPage(0);
    //     }
    //     else{
    //         setStudent(allvehicles);
    //         setCurrentPage(0);
    //     }
    // }


      //   async function deleteid(id){
        //       let result = await fetch(`https://60f2e1206d44f300177887dd.mockapi.io/students/${id}`,{
        //           method: "DELETE",
        //       },);
        //       if (result.status === 200) {
		// 		Swal.fire(" User Deleted!");
		// 	} else {
		// 		Swal.fire({
		// 			position: "top-end",
		// 			icon: "warning",
		// 			title: "Something went wrong",
		// 			showConfirmButton: false,
		// 			timer: 1500,
		// 		});
		// 		setStudent(copy);
		// 	}