<?php
// Set header to return JSON
header('Content-Type: application/json');

// Get POST data
$firstNumber = isset($_POST['firstNumber']) ? $_POST['firstNumber'] : '';
$secondNumber = isset($_POST['secondNumber']) ? $_POST['secondNumber'] : '';
$operation = isset($_POST['operation']) ? $_POST['operation'] : '';

// Validate input
if (empty($firstNumber) || empty($secondNumber) || empty($operation)) {
    echo json_encode([
        'success' => false,
        'message' => 'All fields are required'
    ]);
    exit;
}

// Validate that inputs are numbers
if (!is_numeric($firstNumber) || !is_numeric($secondNumber)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please enter valid numbers'
    ]);
    exit;
}

// Convert to floats
$num1 = floatval($firstNumber);
$num2 = floatval($secondNumber);

// Perform calculation based on operation
$result = 0;

switch ($operation) {
    case 'add':
        $result = $num1 + $num2;
        break;
    
    case 'subtract':
        $result = $num1 - $num2;
        break;
    
    case 'multiply':
        $result = $num1 * $num2;
        break;
    
    case 'divide':
        if ($num2 == 0) {
            echo json_encode([
                'success' => false,
                'message' => 'Cannot divide by zero'
            ]);
            exit;
        }
        $result = $num1 / $num2;
        break;
    
    case 'modulo':
        if ($num2 == 0) {
            echo json_encode([
                'success' => false,
                'message' => 'Cannot perform modulo with zero'
            ]);
            exit;
        }
        $result = $num1 % $num2;
        break;
    
    default:
        echo json_encode([
            'success' => false,
            'message' => 'Invalid operation'
        ]);
        exit;
}

// Round result to 2 decimal places for display (but keep full precision)
$displayResult = round($result, 2);

// Return successful response
echo json_encode([
    'success' => true,
    'result' => $displayResult
]);
?>
