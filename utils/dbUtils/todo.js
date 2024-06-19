import prisma from "@/lib/prismaClient";

export const createTodo = async (userId, todoData) => {
    try {
        const { title, completed = false, } = todoData;
        return await prisma.todo.create({
            data: {
                title,
                completed,
                userId,
            }
        });
    }
    catch (error) {
        throw new Error(error.message)
    }
}

export const getTodos = async (userId, completed) => {
    try {
        return await prisma.todo.findMany({
            where: {
                userId: userId,
                completed: completed !== null ? completed : undefined
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    catch (error) {
        throw new Error(error.message)
    }
}

export const getTodoById = async (userId, todoId) => {
    try {
        const getTodoResult = await prisma.todo.findMany({
            where: {
                id: todoId,
                userId: userId,
            }
        })

        if(getTodoResult.length > 0){
            return getTodoResult;
        }
        else {
            throw new Error('No data found')
        }
    }
    catch (error){
        throw new Error(error.message)
    }
}

export const updateTodo = async (id, userId, todoData) => {
    try {
        const { title, completed } = todoData;
        return await prisma.todo.update({
            where: {
                id: id,
                userId: userId,
            },
            data: {
                title: title,
                completed: completed,
            }
        });
    }
    catch (error) {
        throw new Error(error.message)
    }
}

export const deleteTodo = async (id, userId) => {
    try {
        return  await prisma.todo.delete({
            where: {
                id: id,
                userId: userId,
            }
        })
    }
    catch (error) {
        throw new Error(error.message)
    }
}