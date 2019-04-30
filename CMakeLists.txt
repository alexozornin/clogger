cmake_minimum_required(VERSION 3.5)
project(CLogger)

if(UNIX)
    set(CMAKE_EXE_LINKER_FLAGS "-pthread")
endif()

add_executable(
    CLogger
    "${CMAKE_CURRENT_SOURCE_DIR}/src/main.cpp"
)

target_include_directories(
    CLogger
    PRIVATE "${CMAKE_CURRENT_SOURCE_DIR}/inc"
)

set_target_properties(
    CLogger
    PROPERTIES
    CXX_STANDARD 11
    CXX_STANDARD_REQUIRED ON
    CXX_EXTENSIONS OFF
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_CURRENT_SOURCE_DIR}/bin"
    RUNTIME_OUTPUT_DIRECTORY_DEBUG "${CMAKE_CURRENT_SOURCE_DIR}/bin"
    RUNTIME_OUTPUT_DIRECTORY_RELEASE "${CMAKE_CURRENT_SOURCE_DIR}/bin"
)
