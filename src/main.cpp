#include <string>
#include <iostream>
#include <spdlog/spdlog.h>
#include <spdlog/async.h>
#include <spdlog/sinks/daily_file_sink.h>

int main(int argc, char *argv[])
{
    std::string name;
    if (argc > 1)
    {
        name = argv[1];
    }
    else
    {
        name = "LOG";
    }
    std::string file_path;
    if (argc > 2)
    {
        file_path = argv[2];
    }
    else
    {
        file_path = "log.txt";
    }
    int hours, minutes;
    if (argc > 4)
    {
        hours = std::stoi(std::string(argv[3]));
        minutes = std::stoi(std::string(argv[4]));
    }
    else
    {
        hours = 0;
        minutes = 0;
    }
    auto logger = spdlog::daily_logger_mt<spdlog::async_factory>(name, file_path, hours, minutes);
    std::cout << "READY" << std::endl;
    while (true)
    {
        char message[8192];
        std::cin.getline(message, 8191);
        std::cout << message << std::endl;
        switch (message[0])
        {
        case 'D':
            logger->debug(message);
            break;
        case 'W':
            logger->warn(message);
            break;
        case 'E':
            logger->error(message);
            break;
        case 'C':
            logger->critical(message);
            break;
        default:
            logger->info(message);
            break;
        }
        logger->flush();
    }
    return 0;
}
