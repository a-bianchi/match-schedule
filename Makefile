up_clean_solution: docker compose up --build -V -d

up_solution: docker compose up -d

down_solution: docker compose down

.PHONY: up_clean_solution up_solution down_solution