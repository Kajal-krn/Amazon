class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){   // for search featture
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword,
                $options : "i"  // case insensitive
            },
        } : {

        };

        console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr};  // actual copy is made , not refernce
       // console.log(queryCopy); // = { keyword: 'product1', category: 'laptop' }

        //removing some fields for category
        const removeFileds = ["keyword","page","limit"];
        removeFileds.forEach(key => {
            delete queryCopy[key];
        });

    //    console.log(queryCopy);  // = { category: 'laptop' }
       this.query = this.query.find(queryCopy);
       return this;
    }
}

module.exports = ApiFeatures;