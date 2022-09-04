module.exports = (connection, DataTypes) => {
    const schema = {
        author: {
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

    const AuthorModel = connection.define('Author', schema);
    return AuthorModel;
};