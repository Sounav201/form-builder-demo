const feedbackTemplate = [
    {
        "type": "longtext",
        "question": "Please enter your Name",
        "attributes": {
            "required": false,
            "styling": {
                "fontColor": "#000000",
                "questionImage": "",
                "fontType":"inter"
            }
        },
        "id": "3dUq90AIvpcT1L4fLa5W-",
        "isSelected": true
    },
    {
        "type": "checkbox",
        "question": "Please enter your Gender",
        "attributes": {
            "required": false,
            "styling": {
                "fontColor": "#000000",
                "questionImage": "",
                "fontType":"inter"
            },
            "choices": [
                {
                    "label": "Male",
                    "value": "Male",
                    "id": "1"
                },
                {
                    "label": "Female",
                    "value": "Female",
                    "id": "2"
                },
                {
                    "label": "I don't want to specify",
                    "value": "I don't want to specify",
                    "id": "3"                
                }
            ]
        },
        "id": "oT-etMi0PyWINzNjMHZ7s",
        "isSelected": false
    },
    {
        "type": "rating",
        "question": "Please give a rating based on your Overall Experience",
        "attributes": {
            "required": false,
            "styling": {
                "fontColor": "#000000",
                "hoverColor": "#c31432",
                "fillColor": "#000000",
                "questionImage": "",
                "fontType":"inter"
            },
            "limit": 5,
            "emoji": "Star",
        },
        "id": "Kvgd4ya6bm5xpgA_nE4l4",
        "isSelected": false
    },
]

export  default feedbackTemplate;