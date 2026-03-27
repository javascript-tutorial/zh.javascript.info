
let pages = 
{
    "22109205": {
        "pageid": 22109205,
        "ns": 0,
        "title": "IRT Powerhouse",
        "index": -1,
        "extract": "The <b>IRT Powerhouse</b>, also known as the <b>Interborough Rapid Transit Company Powerhouse</b>...",
        "thumbnail": {
            "source": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/W58th_St_IRT_power_jeh.JPG/400px-W58th_St_IRT_power_jeh.JPG",
            "width": 400,
            "height": 338
        },
        "pageimage": "W58th_St_IRT_power_jeh.JPG",
        "coordinates": [
            {
                "lat": 40.77194444,
                "lon": -73.99222222,
                "primary": "",
                "globe": "earth"
            }
        ]
    },

    "37321190": {
        "pageid": 37321190,
        "ns": 0,
        "title": "VIA 57 West",
        "index": 0,
        "extract": "<p class=\"mw-empty-elt\">\n</p><p><b>VIA 57 West</b> (marketed as <b>VIΛ 57WEST</b>) is a residential building at 625 West 57th Street...",
        "thumbnail": {
            "source": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/VIA_57_West_-_exterior.jpg/400px-VIA_57_West_-_exterior.jpg",
            "width": 400,
            "height": 335
        },
        "pageimage": "VIA_57_West_-_exterior.jpg",
        "coordinates": [
            {
                "lat": 40.77138889,
                "lon": -73.99305556,
                "primary": "",
                "globe": "earth"
            }
        ]
    }
}
;


let ex = pages["37321190"].extract;
console.log(ex.replace(/\n/g, '').replace(/"/g, '\\"'));

let data = {
  xxx:"yyy",
  "text_block":ex,
};
console.log(data);
let json = JSON.stringify(data);
console.log(json);

let back = JSON.parse(json);
console.log(back);
