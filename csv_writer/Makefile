CC=gcc
CCFLAGS=-W -Wall -Werror
PROG=csv_writer

$(PROG): $(PROG).o
	$(CC) $(PROG).o -o $(PROG)

$(PROG).o: $(PROG).c
	$(CC) $(CCFLAGS) $(PROG).c -c

clean:
	rm *.o $(PROG)
