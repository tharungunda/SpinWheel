var fields = [];
var properties = {
    speed: 1,
    time: 10
};

// Checkbox Component
var componentHtml =
    '<div class="input-group-prepend"><div class="input-group-text"><input type="checkbox" id="field" aria-label="Checkbox for following text input"></div></div><input type="text" class="form-control" aria-label="Text input with checkbox">';

$('#addfield').click(() => {
    AddNewField();
});
$('#setfield').click(() => {
    Resolver();
});
$('#start').click(() => {
    Start();
});
$('#reset').click(() => {
    ResetAndStop();
});

$('#reset').prop('disabled', true);

// Add new field
function AddNewField() {
    var element = document.createElement('div');

    element.setAttribute('class', 'input-group mb-3');
    element.innerHTML = componentHtml;

    $('#fieldscontainer').append(element);
}

// Resolve Active Field
function Resolver() {
    fields = [];

    $('#field:checked').each((i, field) => {
        var fieldValue = $(field).closest('.input-group').find('input[type=text]').val();

        fields.push({
            'fillStyle': '#ffffff',
            'text': fieldValue
        });
    });

    optionsWheel();
}

function Start() {
    DisableConfigureButtons();

    properties = {
        speed: parseInt($('#speed').val()) || 1,
        time: parseInt($('#repeataftertime').val()) || 10
    };

    optionsWheel();
    startWheel();

    if ($('#type').val() === 'auto') {
        window.wheelInterval = setInterval(() => {
            startWheel();
        }, properties.time * 1000);
    }
    else {
        startWheel();
    }
}

function DisableConfigureButtons() {
    $('#addfield').prop('disabled', true);
    $('#setfield').prop('disabled', true);
    $('#start').prop('disabled', true);
    $('#reset').prop('disabled', false);
}

function EnableConfigureButtons() {
    $('#addfield').prop('disabled', false);
    $('#setfield').prop('disabled', false);
    $('#start').prop('disabled', false);
    $('#reset').prop('disabled', true);
}

function ResetAndStop() {
    EnableConfigureButtons();
    clearInterval(window.wheelInterval);
    resetWheel();
}

var theWheel = new Winwheel({});

function optionsWheel() {
    theWheel = new Winwheel({
        'numSegments': fields.length, // Specify number of segments.
        'outerRadius': 212, // Set outer radius so wheel fits inside the background.
        'textFontSize': 12, // Set font size as desired.
        'segments': fields,
        'animation': // Specify the animation to use.
        {
            'type': 'spinToStop',
            'duration': 5, // Duration in seconds.
            'spins': properties.speed, // Number of complete spins.
            'callbackFinished': alertPrize
        }
    });

    theWheel.draw();
}

function resetWheel() {
    theWheel.stopAnimation(false);
    theWheel.rotationAngle = 0;
    theWheel.draw();
}

function startWheel() {
    resetWheel();
    theWheel.draw();
    theWheel.startAnimation();
}

function alertPrize(indicatedSegment) {
    var audio = new Audio('./sound/80921__justinbw__buttonchime02up.wav');
    audio.play();
    $('#wheelSelectionResult').text('Seçilen : ' + indicatedSegment.text);
}