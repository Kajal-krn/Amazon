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
        console.log(queryCopy); // = { keyword: 'product1', category: 'laptop', price: { gt: '1000', lt: '2000' } }

        //removing some fields for category
        const removeFileds = ["keyword","page","limit"];
        removeFileds.forEach(key => {
            delete queryCopy[key];
        });

        console.log(queryCopy);  // = { category: 'laptop', price: { gt: '1000', lt: '2000' } }

        // for filter price and rating
        let queryStr1 = JSON.stringify(queryCopy);
        queryStr1 = queryStr1.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);  // replaces gt(greater), lt(lesser), gte(g equal), lte(l equal) whith $gt, $lt, $gte, $lte 
        
        console.log(JSON.parse(queryStr1));
        this.query = this.query.find(JSON.parse(queryStr1));


       return this;
    }
}

module.exports = ApiFeatures;