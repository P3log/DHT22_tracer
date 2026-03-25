#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <time.h>
#include "../include/dht22.h"

#define TRUE 1
#define FALSE 0
#define BUFFER_LENGTH 16
#define COMMAND_BUFFER 64

void usage(char* program) {
    printf("Usage:\n\t%s DELAY_IN_MINUTES\n", program);
}

int main (int argc, char* argv[]) {
    if (argc != 2) {
        usage(argv[0]);
        return EXIT_FAILURE;
    }

    int delay = atoi(argv[1]);
    int status;
    int funcStatus;
    char csvProgram[] = "csv_writer"; // database
    char str_humidity[BUFFER_LENGTH];
    char str_temperature[BUFFER_LENGTH];
    char command[COMMAND_BUFFER];
    float humidity;
    float temperature;

    while(TRUE) {
        funcStatus = getMeasures(&humidity, &temperature);
        if (funcStatus == 1) { // error
            perror("Error while trying to get a measure\n");
            sleep(2);
            continue;
        }
        snprintf(str_humidity, BUFFER_LENGTH, "%.02f", humidity);
        snprintf(str_temperature, BUFFER_LENGTH, "%.02f", temperature);
        
        pid_t pid = fork();
        if (pid == -1) {
            perror("Fork failure\n");
            return EXIT_FAILURE;
        } else if (pid == 0) { // child
            // Trace measures in the csv file
            snprintf(command, COMMAND_BUFFER, "./%s", csvProgram);
            execlp(command, csvProgram, str_humidity, str_temperature, NULL);
            perror("Code recovery failure\n");
        }
        wait(&status);
        sleep(delay * 60); // in seconds
    }
    return EXIT_SUCCESS;
}