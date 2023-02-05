const surveyTemplate = [
    {
        "type": "longtext",
        "question": "Which Department do you work in? (Technical / Sales / Marketing / Operations) ",
        "attributes": {
            "required": false,
            "styling": {
                "fontColor": "#000000",
                "questionImage": ""
            }
        },
        "id": "XTN1iVsTORRctIfNpAig",
        "isSelected": true
    },
    {
        "type": "rating",
        "question": "How satisfied are you based on your opportunities for professional growth?",
        "attributes": {
            "required": false,
            "styling": {
                "fontColor": "#000000",
                "hoverColor": "#c31432",
                "fillColor": "#000000",
                "questionImage": "",
            },
            "limit": 5,
            "emoji": "Smiley",
        },
        "id": "fxeqdANK5uEiru0MOs7YX",
        "isSelected": false
    },
    {
        "type": "checkbox",
        "question": "Please enter your Job Role",
        "attributes": {
            "required": false,
            "styling": {
                "fontColor": "#000000",
                "questionImage": ""
            },
            "choices": [
                {
                    "label": "Executive",
                    "value": "Executive",
                    "id": "1"
                },
                {
                    "label": "Manager",
                    "value": "Manager",
                    "id": "2"
                },
                {
                    "label": "Analyst",
                    "value": "Analyst",
                    "id": "3"
                }
            ]
        },
        "id": "Bf32be17RBj7XThaRyo3T",
        "isSelected": false
    },
]

export  default surveyTemplate;