const searchForKeywords = (data, keywords) => {

    if (typeof(data) == "string") {
        let ans = false
        keywords.forEach(keyword=>{
            if (data.toLowerCase().search(keyword) !== -1) {
                ans = true;
            }
        })
        return ans;
    } else if (typeof(data) == "object" && !Array.isArray(data)) {
        let ans = false;
        const keys = Object.keys(data)
        for (let i=0;i<keys.length;i++) {
            if (searchForKeywords(data[keys[i]], keywords) == true) {
                ans = true;
                break;
            }
        }
        return ans;
    } else if (Array.isArray(data)) {
        let ans = false;
        for (let i=0;i<data.length;i++) {
            if (searchForKeywords(data[i], keywords) == true) {
                ans = true;
            }
        }
        return ans;
    } else {
        return false;
    }
}

const filterEcommerceSites = (array) => {

    const filtered_array = [];
    const keywords = ["ecommerce", "buy", "cart", "shop", "market", "purchase", "delivery", "bill", "ship", "sale"]
    const added_sites = []

    array.forEach(item=>{
        if (searchForKeywords(item,keywords) == true) {
            if (!added_sites.includes(item.displayLink)) {
                filtered_array.push(item)
            }
            added_sites.push(item.displayLink)
        }
    })

    return filtered_array;
}

module.exports = {
    filterEcommerceSites:filterEcommerceSites
}
