CC=gcc
CCFLAGS=-W -Wall -Werror
PROG=manager
SENSOR=dht22
SRC=src
OBJ=obj
BIN=bin
INCLUDE=include


$(BIN)/(PROG): $(OBJ)/$(PROG).o $(OBJ)/$(SENSOR).o
	$(CC) $(OBJ)/$(PROG).o $(OBJ)/$(SENSOR).o -lpigpio -o $(BIN)/$(PROG)

$(OBJ)/$(PROG).o: $(SRC)/$(PROG).c
	$(CC) $(CCFLAGS) -c $(SRC)/$(PROG).c -o $(OBJ)/$(PROG).o

$(OBJ)/$(SENSOR).o: $(SRC)/$(SENSOR).c $(INCLUDE)/$(SENSOR).h
	$(CC) $(CCFLAGS) -c $(SRC)/$(SENSOR).c -o $(OBJ)/$(SENSOR).o

clean:
	rm -f $(OBJ)/$(PROG).O $(BIN)/$(PROG) $(OBJ)/$(SENSOR).o $(BIN)/$(SENSOR)
