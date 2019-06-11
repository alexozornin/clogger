#include <iostream>
#include <fstream>
#include <string>
#include <ctime>

int32_t main(int32_t argc, char **argv)
{
    bool close_file = argc > 2 && argv[2] == "1";
    std::string base_path = argv[1];
    std::string last_date = "";
    std::ofstream fout;
    while (true)
    {
        std::string input;
        std::getline(std::cin, input);
        time_t now = time(0);
        tm *utc = gmtime(&now);
        std::string date;
        std::string time_string;
        switch (utc->tm_wday)
        {
        case 1:
            time_string = "[MON ";
            break;
        case 2:
            time_string = "[TUE ";
            break;
        case 3:
            time_string = "[WED ";
            break;
        case 4:
            time_string = "[THU ";
            break;
        case 5:
            time_string = "[FRI ";
            break;
        case 6:
            time_string = "[SAT ";
            break;
        default:
            time_string = "[SUN ";
            break;
        }
        date = std::to_string(1900 + utc->tm_year) + "-";
        int16_t mon = 1 + utc->tm_mon;
        if (mon < 10)
        {
            date += "0";
        }
        date += std::to_string(mon) + "-";
        if (utc->tm_mday < 10)
        {
            date += "0";
        }
        date += std::to_string(utc->tm_mday);
        if (last_date != date)
        {
            last_date = date;
            if (fout.is_open())
            {
                fout.close();
            }
        }
        if (!fout.is_open())
        {
            fout.open(base_path + last_date + ".txt", std::ios_base::app);
        }
        fout << time_string << date << " ";
        if (utc->tm_hour < 10)
        {
            fout << "0";
        }
        fout << std::to_string(utc->tm_hour) + ":";
        if (utc->tm_min < 10)
        {
            fout << "0";
        }
        fout << std::to_string(utc->tm_min) + ":";
        if (utc->tm_sec < 10)
        {
            fout << "0";
        }
        fout << std::to_string(utc->tm_sec) + " UTC] " << input << std::endl;
        if (close_file)
        {
            fout.close();
        }
    }
}
