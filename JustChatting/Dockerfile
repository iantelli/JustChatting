FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["JustChatting/JustChatting.csproj", "JustChatting/"]
RUN dotnet restore "JustChatting/JustChatting.csproj"
COPY . .
WORKDIR "/src/JustChatting"
RUN dotnet build "JustChatting.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "JustChatting.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "JustChatting.dll"]
