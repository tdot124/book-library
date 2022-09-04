module.exports = (connection, DataTypes) => {
    const schema = {
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    args: [true],
                    msg: "Please enter author name",
                },
                notEmpty: {
                    args:[true],
                    msg: "Please enter author name",
                },
            },
        },
    };

    const GenreModel = connection.define('Genre', schema);
    return GenreModel;
};