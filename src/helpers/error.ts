let errors = []

export function catchErrors(error: Error, reason?: string) {
    errors.push(`Error name: ${error.name}, Error message: ${error.message}, Reason: ${reason}`)

    console.error(error, reason);
}