const attendanceTemplate = [
    {
        "type": "shorttext",
        "question": "Please enter the Date in (DD/MM/YYYY) format",
        "attributes": {
            "required": false,
            "styling": {
                "fontColor": "#000000",
                "questionImage": "",
                "fontType":"inter"
            }
        },
        "id": "gHfltsH6k-W1a5bB70grY",
        "isSelected": true
    },
    {
        "type": "longtext",
        "question": "Please enter the Subject Code",
        "attributes": {
            "required": false,
            "styling": {
                "fontColor": "#000000",
                "questionImage": "",
                "fontType":"inter"
            }
        },
        "id": "SrVjiERE3DTqUtwfXt6Rn",
        "isSelected": true
    },
    {
        "type": "checkbox",
        "question": "Student Roll No.",
        "attributes": {
            "required": false,
            "styling": {
                "fontColor": "#000000",
                "questionImage": "",
                "fontType":"inter"
            },
            "choices": [
                {
                    "label": "Present",
                    "value": "Present",
                    "id": "1"
                },
                {
                    "label": "Absent",
                    "value": "Absent",
                    "id": "2"
                }
            ]
        },
        "id": "HS5OgLbyu-jxUACYyH1fi",
        "isSelected": false
    },
]

export  default attendanceTemplate;